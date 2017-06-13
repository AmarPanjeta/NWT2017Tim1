var rest, mime, client;

rest = require('rest');
mime = require('rest/interceptor/mime');
client = rest.wrap(mime);

export default class $http{

  static get(url){
    return client({
      method:'GET',
      path:url,
      headers: {'Content-Type': 'application/json'}
    }).then(
      response=>{
        if(response.status.code==500 || response.status.code==406){
          throw Error(response);
        }
        else return response;
    })
  };

  static post(url,entity){
    return client({
      method:'POST',
      path:url,
      entity:entity,
      headers: {'Content-Type': 'application/json'}
    }).then(
      response=>{
        if(response.status.code==200) return response;
        if(response.status.code==500  || response.status.code==406){
          throw Error(response.entity.message);
        }
        else return response;
    })
  };
  /*
  static get(url){
    return client({
      method:'GET',
      path:url,
      entity:{username:username,password:password},
      headers: {'Content-Type': 'application/json'}
    })
  };*/
}
