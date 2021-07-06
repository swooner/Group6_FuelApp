import { weekdays } from '../utilities/helper.js';

const selectBoxOptions = document.querySelectorAll('.selectBox__optionsItem');
const selectBox = document.querySelectorAll('.selectBox');

const removeSelectedButton = (btn) => {
    btn.classList.remove('selectBox__optionsItem--selected');
}

const changePeriodCriteria = () => {
    selectBox.forEach(box => {
        box.addEventListener('click', e => {
            const buttons = [...e.target.closest('div').children];
            buttons.forEach(button => {
                if (button.classList.contains('selectBox__optionsItem--selected')) {
                    removeSelectedButton(button);

                };
            });
            e.target.closest('button').classList.add('selectBox__optionsItem--selected');

        })
    })
}
if (selectBoxOptions) {
    changePeriodCriteria();
};
export const renderChart = () => { };
// export const renderChart = (data) => {
//     const ctx_1 = document.getElementById('customersAnalyticsChart').getContext('2d');
//     const myChart_1 = new Chart(ctx_1, {
//         type: 'bar',
//         data: {
//             labels: data.period,
//             datasets: [{
//                 label: 'Number of New Customers',
//                 data: [12, 19, 3, 5, 2, 3, 100],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                     'rgba(255, 15, 64, 1)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 255, 255, 1)',

//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false,

//                 }
//             }
//         }
//     });



//     const ctx_2 = document.getElementById('invoicesAnalyticsChart').getContext('2d');
//     const myChart_2 = new Chart(ctx_2, {
//         type: 'doughnut',
//         data: {
//             labels: ['Sent', 'Pending', 'Paid', 'Unpaid', 'Overdue'],
//             datasets: [{
//                 data: [121, 190, 35, 50, 100],
//                 backgroundColor: [
//                     'rgba(32, 193, 176, 1)',
//                     'rgba(118, 56, 255, 1)',
//                     'rgba(26, 214, 23, 1)',
//                     'rgba(248, 101, 55,1)',
//                     'rgba(207, 0, 15, 1)',
//                 ],
//                 borderColor: [
//                     'rgba(255 , 255, 255, 1)',

//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             layout: {
//                 padding: {
//                     top: 5,
//                     left: 5,
//                     bottom: 5,
//                     right: 5
//                 },
//             },
//             plugins: {
//                 legend: {
//                     display: false,

//                 }
//             }
//         }
//     });
// }

// renderChart();