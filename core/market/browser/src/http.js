import http from 'ky';

export const getList = async () => {
  const { code, data } = await http.get('http://localhost:3333/list').json();
  if (code === 0) {
    return [data, null];
  } else {
    return [null, { code }];
  }
};

export const getDetail = async (name) => {
  const { code, data } = await http.get(`http://localhost:3333/detail/${name}`).json();
  console.log('d', data);
  if (code === 0) {
    return [data, null];
  } else {
    return [null, { code }];
  }
};
