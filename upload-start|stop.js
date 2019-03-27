HTML
<a class="btn btn-default btn-lg " id="up_load"  href="#" >
     <span>确认上传</span>
</a>  
<a class="btn btn-default btn-lg " id="stop_load"  href="#" >
     <span>暂停上传</span>
</a> 


$('#up_load').on('click', function(){
   uploader.start();
});
$('#stop_load').on('click', function(){
   uploader.stop();
});
