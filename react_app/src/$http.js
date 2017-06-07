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
    })
  };

  static post(url,entity){
    return client({
      method:'POST',
      path:url,
      entity:entity,
      headers: {'Content-Type': 'application/json'}
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
