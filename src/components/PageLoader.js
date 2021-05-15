import bars from './bars.svg'

function PageLoader(props) {
    return props.stop ? 
    ( <div className=""></div> )
    : (
        <div className="pageLoader d-flex justify-content-center align-items-center">
            <h1 className="font-2" style={{ letterSpacing:"3px" }}>Le Prandia</h1>
            <img src={bars} alt="pageLoader" />
        </div>
    )
}

export default PageLoader