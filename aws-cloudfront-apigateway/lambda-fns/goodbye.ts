export {};

exports.handler = async (event:any) => {
  console.log(JSON.stringify(event, null, 2));

  return sendRes(200, `Goodbye, CDK! You've hit ${event.path}\n`);
}

const sendRes = (status:number, body:string) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "text/plain"
    },
    body: body
  };
  return response;
};