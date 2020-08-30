/**
 * category 對照 font-awesome CSS 名稱
 * @type {Object} 名稱對照表
 * @property {String} 類別名稱 
*/

const categoryMap = {
    '家居物業': 'fa-home',
    '交通出行': 'fa-shuttle-van',
    '休閒娛樂': 'fa-grin-beam',
    '餐飲食品': 'fa-utensils',
    '其他': 'fa-pen'
}

function getCategoryIcon(recod) {
    for (const key in categoryMap) {
        if (recod.category === key)
        return categoryMap[key]
    }
}

function getSelectList(record = {}) {
    const select = []

    Object.keys(categoryMap).forEach(name => {
        const obj = { category: name }
        if (name === record.category) { obj.select = true }
        select.push(obj)
        })
    
    return select
}

module.exports = { categoryMap, getCategoryIcon, getSelectList }