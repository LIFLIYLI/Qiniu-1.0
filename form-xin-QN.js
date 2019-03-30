//HTML
<form id="myform" name="myform" action="your_url" method="post" enctype="multipart/form-data" >

    <div id="sendBefore">
         <p>上传视频</p>
        <input id="videoForm" type="file" name="videos[]" multiple= "multiple" />
    </div>  
<form>
--------------------- 

JS
//监控form-input中内容代码
$('#videoForm').on('change',function(){
   //获取当前上传的文件名字
  var fileVal=$(this).val();
  var fileName=fileVal.substring(fileVal.lastIndexOf("\\")+1);
  //判断浏览器
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  var token='';
  var fileSize = 0;
  // IE浏览器
  if (isIE && !this.files) { 
     //获得上传文件的绝对路径   
      var filePath = this.value;                    
      var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
      var file = fileSystem.GetFile(filePath);
      // 文件大小单位b
      fileSize = file.Size;   
   }else {  
       //其他浏览器  
       fileSize = this.files[0].size;
   }
   var size = fileSize / 1024 / 1024;
   //计算M
   if (size > 10) {
      alert("视频大小不能超过10M");
      $('#videoForm').val('');
      return;
    }    
`});``
--------------------- 
//ajax上传七牛
$.ajax({
      //获取后台给你下发的token
      url: 'your_get_tokenURL',
      type: 'GET',
      dataType:'json',
      async:false 
  }).done(function(res){
      token=res.youtoken;
      //发送视频请求
      var formData = new FormData(),  
          //七牛给你的域名  
          vistUrl  = 'you_vist_url',     
          fS       = null,
          fStota   = null;    
          //必传的二个值当前的文件和你的token验证 
          formData.append('file', $('#videoForm')[0].files[0]);
          formData.append('token',token)
                $.ajax({
                    url: '七牛的上传地址',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    dataType:'json',
                    contentType: false,
                    //利用progress监控进度
                    xhr:xhrOnProgress(function(e){             
                        var percent = Math.round(e.loaded*100 / e.total)+'%'
                        $('#loadingBar').find('span').css('width',percent);
                        $('#loadingBar span').find('strong').html(percent);  
                        $('#loadingBar span').find('i').html('已上传'+((e.loaded/1204/1024).toFixed(1))+'MB/'+((e.total/1024/1024).toFixed(1))+'MB'); 
                    })
                }).done(function(res) {                  
                    //拼接返回的视频地址，这里的vframe/jpb/offset/1是七牛的视频截取图片的接口          
                    $('.v-box').find('img').attr('src',vistUrl+res.hash+'?vframe/jpg/offset/1').show();                    
                    $('#videoForm').val('');                    

                }).fail(function(res) {
                    console.log(res);
                });
            }).fail(function(res){
                console.log(res);
            })
--------------------- 
