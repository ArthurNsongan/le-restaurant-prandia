import { Pagination } from 'antd'
import 'antd/dist/antd.css'


function MyPagination(props) {

    return(
        <Pagination
            defaultCurrent={props.currentPage}
            defaultPageSize={props.PerPage}
            pageSize={props.PerPage}
            onChange={props.handleChange}
            total={/*loadingOk && */props.listLength }
        />
    )
}

export default MyPagination