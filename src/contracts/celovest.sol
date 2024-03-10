// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error TransferFailed();

contract CeloVest {
    struct Campaign {
        address user;
        uint256 amount;
        uint256 interval;
        uint256 lastDeductedTime;
        bool active;
    }

    mapping(address => Campaign[]) public campaigns;

    struct SafeData {
        address owner;
        uint256 amount;
        uint256 releaseTime;
        bool withdrawn;
    }

    mapping(address => SafeData[]) public safes;

    IERC20 public s_savingToken;

    event CampaignCreated(
        address indexed user,
        uint256 indexed amount,
        uint256 indexed interval
    );
    event CampaignStopped(address indexed user, uint256 indexed amount);
    event FundsTransferred(address indexed user, uint256 indexed amount);
    event GoalSavingSet(address indexed user, uint256 indexed targetAmount,string goalDescription);
    event SafeCreated(
        address indexed owner,
        uint256 indexed amount,
        uint256 indexed releaseTime
    );
    event Withdrawn(address indexed owner, uint256 indexed amount);
    event ForceWithdrawn(
        address indexed owner,
        uint256 indexed amount,
        uint256 indexed penalty
    );

    constructor(address _savingToken) {
        s_savingToken = IERC20(_savingToken);
    }

    function createCampaign(uint256 _amount, uint256 _interval) public {
        campaigns[msg.sender].push(
            Campaign(msg.sender, _amount, _interval, block.timestamp, true)
        );
        emit CampaignCreated(msg.sender, _amount, _interval);
    }

    function stopCampaign(uint256 _campaignIndex) public {
        require(
            _campaignIndex < campaigns[msg.sender].length,
            "Campaign does not exist"
        );
        Campaign storage campaign = campaigns[msg.sender][_campaignIndex];

        if (campaign.active) {
            campaign.active = false;

            bool success = s_savingToken.transfer(msg.sender, campaign.amount);
            if (!success) {
                revert TransferFailed();
            }
            emit CampaignStopped(msg.sender, campaign.amount);
        }
    }

    function autoTransferFunds(uint256 _interval) public {
        for (uint256 i = 0; i < campaigns[msg.sender].length; i++) {
            Campaign storage campaign = campaigns[msg.sender][i];

            if (
                campaign.interval == _interval &&
                campaign.active &&
                block.timestamp >= campaign.lastDeductedTime + campaign.interval
            ) {
                bool success = s_savingToken.transferFrom(
                    msg.sender,
                    address(this),
                    campaign.amount
                );
                if (!success) {
                    revert TransferFailed();
                }

                campaign.lastDeductedTime = block.timestamp;
                emit FundsTransferred(msg.sender, campaign.amount);
            }
        }
    }

    function withdrawFromCampaign(uint256 _campaignIndex) public {
        require(
            _campaignIndex < campaigns[msg.sender].length,
            "Campaign does not exist"
        );

        Campaign storage campaign = campaigns[msg.sender][_campaignIndex];

        require(campaign.active, "Campaign is not active");

        bool success = s_savingToken.transfer(msg.sender, campaign.amount);
        if (!success) {
            revert TransferFailed();
        }
        campaign.active = false;
        emit CampaignStopped(msg.sender, campaign.amount);
    }

    function createSafe(uint256 _releaseTime, uint256 _amount) public payable {
        require(
            _releaseTime > block.timestamp,
            "Release time must be in the future"
        );

        bool success = s_savingToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!success) {
            revert TransferFailed();
        }

        safes[msg.sender].push(
            SafeData(msg.sender, msg.value, _releaseTime, false)
        );
        emit SafeCreated(msg.sender, msg.value, _releaseTime);
    }

    function withdraw(uint256 _safeIndex) public {
        require(_safeIndex < safes[msg.sender].length, "Safe does not exist");
        SafeData storage safe = safes[msg.sender][_safeIndex];
        require(!safe.withdrawn, "Funds already withdrawn");
        require(
            block.timestamp >= safe.releaseTime,
            "Release time not reached yet"
        );

        safe.withdrawn = true;

        bool success = s_savingToken.transfer(msg.sender, safe.amount);
        if (!success) {
            revert TransferFailed();
        }

        emit Withdrawn(msg.sender, safe.amount);
    }

    function forceWithdraw(uint256 _safeIndex) public {
        require(_safeIndex < safes[msg.sender].length, "Safe does not exist");
        SafeData storage safe = safes[msg.sender][_safeIndex];
        require(!safe.withdrawn, "Funds already withdrawn");

        uint256 penalty = (safe.amount * 40) / 100;
        safe.withdrawn = true;

        bool success = s_savingToken.transfer(
            msg.sender,
            safe.amount - penalty
        );
        if (!success) {
            revert TransferFailed();
        }

        emit ForceWithdrawn(msg.sender, safe.amount - penalty, penalty);
    }

    function getMySafes() public view returns (SafeData[] memory) {
        return safes[msg.sender];
    }

    // struct GoalSaving {
    //     address user;
    //     uint256 targetAmount;
    //     string goalDescription;
    //     uint256 currentAmount;
    // }

    // mapping(address => GoalSaving) public goalSavings;

    // event GoalSavingSet(address indexed user, uint256 indexed targetAmount);


    // function setGoalSaving(
    //     uint256 _targetAmount,
    //     string memory _goalDescription
    // ) public {

    //     goalSavings[msg.sender] = GoalSaving(
    //         msg.sender,
    //         _targetAmount,
    //         _goalDescription,
    //         0
    //     );
    //     emit GoalSavingSet(msg.sender, _targetAmount,_goalDescription);
    // }

    //  function depositToGoalSaving() public payable {
    //     require(goalSavings[msg.sender].targetAmount > 0, "Goal saving not set");
        
    //     goalSavings[msg.sender].currentAmount += msg.value;

    //     if (goalSavings[msg.sender].currentAmount >= goalSavings[msg.sender].targetAmount) {
    //         // Logic to handle reaching the goal amount
    //         // Implement your goal completion logic here
    //         goalSavings[msg.sender].currentAmount = 0; // Reset current amount after reaching the goal
    //     }
    // }




}
