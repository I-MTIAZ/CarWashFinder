export const Platinum = (index, points) => {
    let mainpoints = points;

    if (index === 1) {
        mainpoints -= 20;
    } else if (index === 2) {
        mainpoints -= 40;
    } else {
        mainpoints -= 60;
    }

    if (mainpoints >= 0) {
        return mainpoints;
    } else {
        return -1;
    }
};


export const Ptitle = {
    one: {
        head: "20 points",
        body: "You get some Offers"
    },
    two: {
        head: "40 points",
        body: "You get some Offers"
    },
    three: {
        head: "60 points",
        body: "You get some Offers"
    }
}
