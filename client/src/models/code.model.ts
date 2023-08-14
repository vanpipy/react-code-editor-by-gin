import axios from 'axios';

export const executeCode = async (code: string) => {
  const response = await axios.request({
    url: '/api/v1/execute',
    method: 'POST',
    data: { code },
  });
  return response.data || { error: null, msg: null };
};
