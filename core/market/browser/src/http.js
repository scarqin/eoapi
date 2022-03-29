import http from 'ky';

export const getList = async () => {
  const { code, data } = await http.get('http://127.0.0.1:3000/list').json();
  if (code === 0) {
    return [data, null];
  } else {
    return [null, { code }];
  }
};

export const getDetail = async (name) => {
  const { code, data } = await http.get(`http://127.0.0.1:3000/detail/${name}`).json();
  if (code === 0) {
    return [data, null];
  } else {
    return [null, { code }];
  }
};
