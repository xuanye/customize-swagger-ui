import { useState } from 'react';
import { createModel } from 'hox';
import utility from '../utility';

function useAddress() {
    const [sortType, setSortType] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [addressList, setAddressList] = useState([
        { name: 'Tom', email: 'Tom@tiok.com', address: 'Shanghai', status: 0 },
        { name: 'David', email: 'David@tiok.com', address: 'Beijing', status: 0 },
        { name: 'Crown', email: 'Crown@tiok.com', address: 'Guangzhou', status: 0 },
        { name: 'Aron', email: 'Aron@tiok.com', address: 'Chongqing', status: 0 },
    ]);

    const setASCSortType = () => {
        setSortType(1);
        setAddressList([...addressList.sort(utility.ascCompare)]);
    };
    const setDESCSortType = () => {
        setSortType(2);
        setAddressList([...addressList.sort(utility.descCompare)]);
    };
    const addItem = data => {
        setAddressList([...addressList, data || { name: '', email: '', address: '', status: 1 }]);
    };
    const removeAddressItem = index => {
        addressList.splice(index, 1);
        console.log('🚀 ~ file: address.js ~ line 32 ~ useAddress ~ index', index);
        console.log('🚀 ~ file: address.js ~ line 32 ~ useAddress ~ index', addressList);
        setAddressList([...addressList]);
    };
    const editAddressItem = index => {
        const newList = addressList.map((item, i) => {
            item.status = i == index ? 2 : 0;
            return item;
        });
        setAddressList(newList);
    };
    const saveAddressItem = (index, data) => {
        const newList = addressList.map((item, i) => {
            item.status = 0;
            if (i == index) {
                item.name = data.name;
                item.email = data.email;
                item.address = data.address;
            }
            return item;
        });
        setAddressList(newList);
    };
    const filterChanged = text => {
        setFilterText(text);
    };
    const cancelSaveItem = data => {
        if (data.status == 1) {
            addressList.splice(state.list.length - 1, 1);
            //新增
            setAddressList([...addressList]);
        } else {
            const newList = addressList.map((item, i) => {
                item.status = 0;
                return item;
            });
            setAddressList(newList);
        }
    };

    return {
        sortType,
        filterText,
        addressList,

        setASCSortType,
        setDESCSortType,
        addItem,
        removeAddressItem,
        editAddressItem,
        saveAddressItem,
        filterChanged,
        cancelSaveItem,
    };
}

export default createModel(useAddress);
