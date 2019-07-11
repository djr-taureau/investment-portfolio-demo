import * as d3 from "d3";
const boxMullerRandom = () => Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());

const randomAroundMean = (mean, deviation) => mean + boxMullerRandom() * deviation;

const today = new Date();

const formatDate = d3.timeFormat("%m/%d/%Y");
export const getTimelineData = (length = 100) => {
    let lastAmount = randomAroundMean(325.2, 110);
    const firstAmount = d3.timeDay.offset(today, -length);

    return new Array(length).fill(0).map((d, i) => {
        lastAmount += randomAroundMean(0, 2);
        return {
            date: formatDate(d3.timeDay.offset(firstAmount, i)),
            value: lastAmount
        };
    });
};

export const getFinanceData = (length = 6) => {
    let lastAmount = randomAroundMean(325.2, 110);
    const firstAmount = d3.timeDay.offset(today, -length);

    return new Array(length).fill(0).map((d, i) => {
        lastAmount += randomAroundMean(0, 2);
        return {
            date: formatDate(d3.timeDay.offset(firstAmount, i)),
            value: lastAmount
        };
    });
};
