import { useState } from 'react';
import { createModel } from 'hox';

function useRequest() {
    const [requestData, setRequestData] = useState([]);

    return {
        requestData,
        setRequestData,
    };
}
export default createModel(useRequest);
