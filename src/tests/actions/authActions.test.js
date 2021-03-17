import { login, startLogin, logout, startLogout } from "../../actions/authActions";
import moment from 'moment';

test('should login with user', () => {
    const uid = 'uid';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
});

test('should login without user', () => {
    const action = login();
    expect(action).toEqual({
        type: 'LOGIN'
    })
});

test('should logout', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT',
    })
});