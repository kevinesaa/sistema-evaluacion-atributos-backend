import { Router } from 'express';
import { header, query } from 'express-validator';
import { validateInputs, validateJWT } from '../../common/middlewares';
import { allProfileTypes, allAttributes, allAttributesTypes,allAttributeByProfiles } from './controllers/profileType.controller';
import { commonErrorsCodes } from '../../common/errorManager/AppCommonErrorCodes';
import { authErrosCodes } from '../authenticate/helpers/authErrorManager';
import { currentApiPath, profileTypes,attributesModule,attributeTypes,attributesProfiles } from '../routerPaths';
import { attributeErrosCodes } from './helpers/attributeErrorManager';


const router = Router();

//profile types
router.get(currentApiPath + profileTypes, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allProfileTypes );

//return attributes 
router.get(currentApiPath + attributesModule, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    query('page',commonErrorsCodes.PAGE_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('limit',commonErrorsCodes.LIMIT_NOT_VALID_DATA_TYPE).optional().isInt(),
    query('attributeTypeId',attributeErrosCodes.ATTRIBUTE_TYPE_ID_IS_NOT_NUMERIC).optional().isNumeric().toInt(),
    validateInputs,
], allAttributes );

//profiles types
router.get(currentApiPath + attributeTypes, [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    validateInputs,
], allAttributesTypes)

//attributes by profiles
router.get(currentApiPath + attributesProfiles , [
    header('token',authErrosCodes.AUTH_MISSING_TOKEN).notEmpty(),
    header('token').custom(validateJWT).withMessage(authErrosCodes.AUTH_NOT_VALID_TOKEN),
    query('profileId',attributeErrosCodes.ATTRIBUTE_PROFILE_TYPE_ID_IS_NOT_NUMERIC).optional().isNumeric().toInt(),
    validateInputs,
], allAttributeByProfiles)

export default router;