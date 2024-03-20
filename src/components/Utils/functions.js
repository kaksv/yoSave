export function shortenString(str) {
    if (!str) return;
    if (str.length <= 11) {
        return str;
    } else {
        let firstPart = str.substring(0, 8);
        let lastPart = str.substring(str.length - 4);
        return `${firstPart}...${lastPart}`;
    }
}



export async function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        alert("id copied")
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}


export const dummySafeData = [
    {

        owner: "hh",
        amount: 20000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false


    },
    {

        owner: "gggt",
        amount: 920000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false


    },
    {

        owner: "hu",
        amount: 120000000000000000000,
        releaseTime: 1710308379,
        withdrawn: false

    },
    {

        owner: "yuhh",
        amount: 150000000000000000000,
        releaseTime: 1715337114,
        withdrawn: true


    }

]



export const dummyCommunityData = [
    {

        title: "Twezimbe",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []


    },
    {

        title: "Crypto Bros",
    
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []



    },
    {

        title: "Future Dons",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 100000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []


    },
    {

        title: "Poverty Haters",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 400000000000000000,
        isActive: true,
        members: ["dd","MOMI"]



    },
    {

        title: "Twezimbe",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []


    },
    {

        title: "Crypto Bros",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []



    },
    {

        title: "Future Dons",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 100000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: []


    },
    {

        title: "Poverty Haters",
        description: "Hello,there,here is a simple description of our community and how you can be part of the drive",
        target: 2000000000000000000,
        currentAmount: 0,
        isActive: true,
        members: ["yu","gy"]



    }

]

export const dummyRequestData = [
    "0x16e06D21b252FD2Ff9cd5794d7c5A3224e71cDF6",
    "0x16e06D21b252FD2Ff9cd5794d7c5A3224e71cDF6",
    "0x16e06D21b252FD2Ff9cd5794d7c5A3224e71cDF6",
    "0x16e06D21b252FD2Ff9cd5794d7c5A3224e71cDF6"


]


export function createObjectFromArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('Arrays must be of the same length');
    }

    const result = {};
    for (let i = 0; i < arr1.length; i++) {
        result[arr1[i]] = arr2[i];
    }

    return result;
}









export function getFullDateFromSeconds(unixNano) {
    const unixMilli = Math.floor(unixNano * 1000)
    const date = new Date(unixMilli)
    return date.toLocaleString()
}