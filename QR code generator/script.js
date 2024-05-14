function generateQR() {
   if (qrText.value.length>0){
   let qrImage = document.getElementById("qrImage");
   let qrText = document.getElementById("qrText").value;
   qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=230x250&data=" + qrText;
   imgBox.classList.add("show-img");
   }else{
      qrText.classList.add('error');
      setTimeout(()=>{
         qrText.classList.remove('error');
      } , 1000);     
   }
}
