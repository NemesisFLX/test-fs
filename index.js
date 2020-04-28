const fs = require("fs")
const uuid = require('uuid');
const { PerformanceObserver, performance } = require('perf_hooks');
const obs = new PerformanceObserver((items) => {
    console.log(items.getEntries()[0].duration);
    performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

for (let j = 0; j <= 6; j++) {
    performance.mark('Start Write' + j);
    let id = ""
    for (let i = 1; i <= Math.pow(10, j); i++) {
        id = uuid.v4()
        fs.writeFileSync("./test/" + id, "File: " + i + "|" + j)
    }
    performance.mark('End Write' + j);
    performance.measure('Start to End', 'Start Write' + j, 'End Write' + j);
    performance.mark('Start Read' + j);
    console.log(fs.readFileSync("./test/" + id, "utf-8"))
    performance.mark('End Read' + j);
    performance.measure('Start to End', 'Start Read' + j, 'End Read' + j);
}
