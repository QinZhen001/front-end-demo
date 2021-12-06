import { RteErrorCenter, AGRteErrorCode } from "./index";

const err = new Error("asd");
RteErrorCenter.shared.handleThrowableError(AGRteErrorCode.RTE_ERR_MISSING_PARAMS, err);
