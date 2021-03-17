import authReducer from '../../reducers/authReducer'
import moment from 'moment';

test('should login', () => {
    const uid = 'logged in user';
    const state = authReducer( undefined, { type: 'LOGIN', uid: uid});
    expect(state.uid).toBe(uid);
});

test('should logout', () => {
    const state = authReducer( undefined, { type: 'LOGOUT'});
    expect(state.uid).toBe();
});

test('should logout already logged in user', () => {

    const testState = {
        uid: 'logged in'
    };
    
    const state = authReducer( undefined, { type: 'LOGOUT'});
    expect(state.uid).toBe();
});