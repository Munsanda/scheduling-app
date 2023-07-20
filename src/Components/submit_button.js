function SubmitButton({handleFormSubmit}){
    return (
        <button type="button" onClick={handleFormSubmit} className="btn btn-outline-success">Submit</button>
    );
}
export default SubmitButton;