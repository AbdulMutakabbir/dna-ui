import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const ExpandedRowComponent = ({data}) => {
    return(
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}

const NoDataComponent = ({data}) => {
    return (
        <pre>No Data Found</pre>
    )
}

const SwitchFilter = () => {

    const defaultFilteredSwitchList = []
    const defaultDataTableColums = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'IP',
            selector: row => row.managementIpAddress,
            sortable: true,
        },
        {
            name: 'Hostname',
            selector: row => row.hostname,
            sortable: true,
        },
        {
            name: 'Series',
            selector: row => row.series,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        }
    ]
    const defaultLoadingDataTableData = true

    const [filteredSwitchList, setFilteredSwitchList] = useState(defaultFilteredSwitchList)
    const [loadingDataTableData, setLoadingDataTableData] = useState(defaultLoadingDataTableData)

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/get_filtered_switches',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                setFilteredSwitchList(response.data.response)
                setLoadingDataTableData(false)
                
                console.log(response.data.response)
            })
            .catch(function (error) {
                setLoadingDataTableData(false)
                console.log(error);
            });
    }, [defaultFilteredSwitchList])

    return (
        <DataTable
            title="Switch List"
            columns={defaultDataTableColums}
            data={filteredSwitchList}
            fixedHeader={true}
            responsive={true}
            striped={true}
            highlightOnHover={true}
            pointerOnHover={true}
            persistTableHead={true}
            noDataComponent={NoDataComponent}
            progressPending={loadingDataTableData}
            onColumnOrderChange={cols => {}}
            expandableRows 
            expandableRowsComponent={ExpandedRowComponent} 
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            pagination
        />
    )
}

export default SwitchFilter