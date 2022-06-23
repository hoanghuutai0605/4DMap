import axios from "axios";

let antennaUrl =
  "https://bts-gd2.vimap.vn/api/BTS/InforTruAnten/search-tru-anten?code=001053&chuSoHuu=&loaiTram=&loaiCot=&lat=0&lng=0&radius=0";
let access_token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRCNzQ0RUFFMkNEMjM0NUI2QzgxQzYwMkJCN0M4MUREIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTU4NjMwMzksImV4cCI6MTY4NzM5OTAzOSwiaXNzIjoiaHR0cHM6Ly90ZXN0LXh0ZHQtcXVhbmduZ2FpLnZpbWFwLnZuIiwiYXVkIjoiSW9UIiwiY2xpZW50X2lkIjoiSW9UX0FwcCIsInN1YiI6IjE2ZDdlYjJiLWFhNjQtNWQ2Ni1kZTc5LTM5ZmUyZDE5YTI2OSIsImF1dGhfdGltZSI6MTY1NTg2MzAzOSwiaWRwIjoibG9jYWwiLCJyb2xlIjoiYWRtaW4iLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsIjoiYWRtaW5AYWJwLmlvIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1NTg2MzAzOSwic2NvcGUiOlsiSW9UIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.Nj0qcIdds95UMRJ4tW5O76LMWrfCCDYVg9A3MDWglb9sMDzlibMLNqOt5gSwc784eScwyyR7TQgT8-xtMozxwoz7OzV-eGjA7bSZfBXO4jwAO_olgI4YjW2IbiWuA7TvZSuBbcfRQPipa3Ynky18_JmXGG5KD8xiZe-Df21SlTZc2632rn4hqeyGeBQiaADfOmu62Lz5iScIPs_aXpmayufz2YCXxVMMY_-1-Auji7izdH3u2oF1uE6H7y9wNDCKCwg6X7C48VJG169ff4nXhB8eK7odvQLvr1iyYr4YU6LYNfA-6bAilPZZQWdq1hhJzpLWkeQG7kbvlkfv6g024g";

axios
  .get(antennaUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error);
  });
// const antennaApi = {
//     axios.get(antennaUrl, {
//   headers: {
//     'Authorization': `Bearer ${access_token}`
//   }
// })
// .then((res) => {
//   console.log(res.data)
// })
// .catch((error) => {
//   console.error(error)
// })
// };

export default antennaApi;
