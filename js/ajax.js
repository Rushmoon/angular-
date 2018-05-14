obj = {
    method: 'post',
    url: 'xxx.php',
    data:{name:'tom',age:3},
    success:function(){

    },
    dataType: 'JSON'
}
//name=tom&age=3
function ajax( config ){
    var xhr = null, result = null;

    if(XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else if(ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var options = config;

    /*
        url : options.url
        method: options.method
        data: options.data
    */

    if(options.data){
        var data = '';



        for(var k in options.data){
            data += k + '=' + options.data[k] + '&'
        }

        data = data.slice(0, -1);

        if(typeof options.data === 'string'){
            data = options.data;
        }

    }


    if(options.method.toUpperCase() === 'GET'){

        if(data){
            options.url = options.url + '?' + data;
        }
        xhr.open('get' , options.url );

    }else if(options.method.toUpperCase() === 'POST'){

        xhr.open('post' , options.url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")

    }

    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4){

            if(xhr.status === 200){

                switch(options.dataType.toUpperCase()){

                    case 'JSON':
                        result = JSON.parse(xhr.responseText);
                        break;

                    case 'XML':
                        result = xhr.responseXML;
                        break;

                    case 'SCRIPT':
                        break;

                    default:
                        result = xhr.responseText;
                        break;
                }

                options.success(result);

            }

        }

    }


    xhr.send(data);
}