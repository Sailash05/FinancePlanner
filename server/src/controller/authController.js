import { response } from '../utils/response.js';
import { generateJwtToken } from '../utils/jwtToken.js';

import { createUserService, loginUserService } from '../service/authService.js';

export const createUser = async (req, res) => {
    const result = await createUserService(req.body);

    if (result.status === 201) {
      const token = generateJwtToken({ userId: result.userId });

      return res
        .status(201)
        .send(response("SUCCESS", result.message, { jwtToken: token, userId: result.userId }));
    }
    else if (result.status === 400) {
      return res.status(400).send(response("FAILED", result.message, null));
    }
    else {
      return res.status(500).send(response("FAILED", result.message, null));
    }
}

export const loginUser = async (req, res) => {
    try {
        const result = await loginUserService(req.body);
        
        if(result.status === 400 || result.status === 500) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
        else if(result.status === 200) {
            const token = generateJwtToken({ userId: result.userId });
            return res.status(200).send(response('SUCCESS', result.message, { jwtToken: token, userId: result.userId }));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const verifyTokenController = async (req, res) => {
    return res.status(200).json({ valid: true, user: req.user });
}