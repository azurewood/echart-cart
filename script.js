// Initialise the echarts instance based on the prepared dom
const myChart = echarts.init(document.getElementById('main'));
const cart = [
    { id: 1, value: 40, name: 'Fish' },
    { id: 2, value: 3, name: 'Salt' },
    { id: 3, value: 14, name: 'Rice' },
    { id: 4, value: 10, name: 'Pepper' },
    { id: 5, value: 18, name: 'Chicken' }
];

let option;

option = {
    legend: {
        top: 'bottom'
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
            name: 'Shopping List',
            type: 'pie',
            radius: [50, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: cart
        }
    ]
};

option && myChart.setOption(option);

// Get the list and all the delete buttons
const list = document.getElementById('my-list');
//const deleteButtons = document.querySelectorAll('.delete');

// Add event listener to the list to listen for clicks on the delete buttons
list.addEventListener('mouseup', function (e) {
    // Check if the clicked element is a delete button
    if (e.target.classList.contains('delete')) {
        // Get the list item that contains the delete button and remove it
        const listItem = e.target.parentNode;
        console.log(listItem.parentNode.getAttribute("value"))
        list.removeChild(listItem.parentNode);
        //cart=cart.filter(item=>item.id!==parseInt(listItem.parentNode.getAttribute("value")));
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === parseInt(listItem.parentNode.getAttribute("value"))) {

                cart.splice(i, 1);
            }
        }

        myChart.setOption(option);
        console.log(cart.filter(item => item.id !== parseInt(listItem.parentNode.getAttribute("value"))))
    }
});

const submitButton = document.getElementById('add-item-btn');

submitButton.onclick = function () {
    // Get the news title and content input values
    const itemNameInput = document.getElementById('item-name');
    const itemCostInput = document.getElementById('item-cost');

    // console.log(newsTitleInput.value);
    // populate the news value to array
    const id = cart.slice(-1)?.[0]?.id;
    const one = { id: id ? id + 1 : 1, value: parseFloat(itemCostInput.value), name: itemNameInput.value }
    cart.push(one)
    //myChart.data=cart;
    myChart.setOption(option);
    addItem(one)
    // console.log(one)
    itemCostInput.value = "";
    itemNameInput.value = "";

};

function addItem(item) {
    // const template = document.getElementById("item-template").content.cloneNode(false);
    // console.log(template)
    //template.querySelector('.item-name').innerText = item.name;
    const item_name = document.getElementById("item-template").content.cloneNode(true).querySelector('.item-name');
    item_name.setAttribute("value", item.id);
    item_name.innerText = item.name;
    const item_cost = document.getElementById("item-template").content.cloneNode(true).querySelector('.item-cost');
    item_cost.innerText = item.value.toFixed(2);
    const del_btn = document.getElementById("item-template").content.cloneNode(true).querySelector('.delete-btn');
    item_name.appendChild(item_cost)
    item_name.appendChild(del_btn)
    // console.log(item_name)
    // console.log(item_cost)
    // console.log(del_btn)
    //template.querySelector('.item-cost').innerText = item.value;
    document.querySelector('#my-list').appendChild(item_name);
}

if ('content' in document.createElement('template')) {
    cart.forEach((item) => {
        //console.log(item)
        addItem(item);
    })
}