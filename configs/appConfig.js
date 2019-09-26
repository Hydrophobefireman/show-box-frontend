const os = require("os");
module.exports = {
  id: "__appConfig",
  config: {
    SHOULD_PREFETCH_MODULES: false,
    SHOW_STATUS_WHILE_PREFETCHING: true,
    IS_STATUS_R: false,
    INLINED_CONFIG: true,
    BUILD_DETAILS: {
      BUILD_TIME: new Date().toUTCString(),
      SYS_INFO: {
		current_build_platform:os.platform(),
	}
    }
  }
};
