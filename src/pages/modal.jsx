const Modal=()=>{
    <>
    
     return(
        <div class="myModal">
           <div class="modalContainer" style="width:300px;border-radius:10px;">
                <div class="card border-succes mb-3 bg bg-default">
                   <div class="card-header bg-transparent border-default">
                        <h5 style="text-align:center;">Confirmation.............</h5>
                    </div>
                    <div class="card-body text-success">
                        <p>Are you sur to delete: </p>      
                        <span style="font-weight:bold;"> </span> in this dashboard?
                    </div>
                    <div class="card-footer bg-transparent border-default">
                        <button   class="bg bg-danger">No</button>
                        <button  class="bg bg-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
     )
    
    </>
}
export default Modal;