function RefreshButton({handleFormRefresh}){
    return (
        <button type="button" onClick={handleFormRefresh} className="btn btn-outline-success">Load</button>
    );
}
export default RefreshButton;