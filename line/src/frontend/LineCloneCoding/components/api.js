import axios from 'axios';

//친구 목록 가져오기 api
export const fetchFriendsList = async (userId) => {
    try {
        const response = await axios.post('http://192.168.35.23:8008/boot/friends/friendsList', {
            user_id: userId
        });
        console.log(response.data);
        return response.data.list;
    } catch (error) {
        console.error('Failed to fetch friends list:', error);
        return []; // 오류가 발생한 경우 빈 배열 반환
    }
};
