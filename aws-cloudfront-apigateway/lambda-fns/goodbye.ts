export {};

exports.handler = async (event:any) => {
  console.log(JSON.stringify(event, null, 2));

  let request = JSON.parse(event.body);
  let name = request.name;
  let address = request.address;
  let town = address.town;

  let details = { message: "goodbye", name: name, town: town };

  return sendRes(200, JSON.stringify(details));
}

const sendRes = (status:number, body:string) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  };
  return response;
};