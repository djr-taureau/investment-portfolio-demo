import { UrlUtil } from "./url.util";

export class Logger {
    /**
     * @property {Boolean} isEnabled - Flag indicating if this logger instance is enabled. If the "global",
     * static `isEnabled` property is true then this is ignored.
     */
    public static isEnabled = true;

    /**
     * @property {Boolean} isEnabled - Flag indicating if the logger's timestamp should be in military time.
     */
    public static useMilitaryTime = false;

    /**
     * A constant. Indicates the "log" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_ALL = 0;

    /**
     * A constant. Indicates the "log" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_LOG = 2;

    /**
     * A constant. Indicates the "debug" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_DEBUG = 4;

    /**
     * A constant. Indicates the "info" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_INFO = 6;

    /**
     * A constant. Indicates the "warn" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_WARN = 8;

    /**
     * A constant. Indicates the "error" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_ERROR = 10;

    /**
     * A constant. Indicates the "fatal" logging level.
     * @type {Number}
     * @const
     */
    public static LEVEL_FATAL = 1000;

    /**
     * @property {Number} isEnabled - Flag indicating if this logger instance is enabled. If the "global",
     * static `isEnabled` property is true then this is ignored.
     */
    public static LEVEL: number = Logger.LEVEL_ALL;

    /**
     * @property {Boolean} didWarnLoggingOff - Flag indicating if a single log message was issued
     * when logging is disabled or off.
     */
    public static didWarnLoggingOff = false;

    /**
     * @property {String} context - The context is typically the class name or descriptor for
     * this logger instance.
     */
    public context = "";

    /**
     * Creates a logger that outputs the following format:
     *
     * 16:11:45:956 DEBUG [AuthenticationController] - login: username = a, password = a
     *
     * @param {String} context - The string name used for the logger. This is often the class name of the object the
     * logger is used in.
     * @returns {Logger} An instance of the WebAudioPlayerLogger logger.
     */
    public static getLogger(context: string): Logger {
        if (context == null) {
            throw new Error("invalid logger name");
        }

        return new Logger(context);
    }

    /**
     * Creates a print-friendly timestamp in the form of 16:11:45:956 for logging purposes.
     *
     * @return {String} A timestamp in the form of 16:11:45:956.
     */
    public static getTimestamp(date?: Date): string {
        date = date || new Date();
        let hours: number | string = date.getHours();
        let minutes: number | string = date.getMinutes();
        let seconds: number | string = date.getSeconds();
        let milliseconds: number | string = date.getMilliseconds();

        if (hours < 10) {
            hours = "0" + hours;
        } else if (!Logger.useMilitaryTime && hours > 12) {
            hours = hours - 12;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (milliseconds < 10) {
            milliseconds = "00" + milliseconds;
        } else if (milliseconds < 100) {
            milliseconds = "0" + milliseconds;
        }

        return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
    }

    /**
     * Creates a readable log message with the following format:
     *
     * 13:36:22:069 [DEBUG] MyClass - methodName( some message. )
     *
     * @param {String} context - Usually the class name or context for the logger.
     * @param {Number} level - The log level.
     * @param {String} msg - The message to be logged.
     * @returns {String}
     */
    public static getPrintFriendlyLogStatement(context: string = "", level: number = 0, msg: string): string {
        // TODO: BMR: Cleanup this log level switch as similar is done above.
        let levelStr = "";
        switch (level) {
            case Logger.LEVEL_INFO:
                levelStr = "INFO";
                break;

            case Logger.LEVEL_WARN:
                levelStr = "WARN";
                break;

            case Logger.LEVEL_ERROR:
            case Logger.LEVEL_FATAL:
                levelStr = "ERROR";
                break;

            default:
                levelStr = "DEBUG";
                break;
        }

        return `[SBP] ${Logger.getTimestamp()} [${levelStr}] ${context} - ${msg}`;
    }

    /**
     * Initialize the Logger and create a context for it.
     */
    constructor(context: string = "") {
        this.context = context;
        Logger.LEVEL = this.getQueryStringLogLevel() || Logger.LEVEL_ALL;
    }

    /**
     * Attempts to grab the log level specified in the query string. If it finds any of the string values:
     *
     *      * all
     *      * debug
     *      * info
     *      * warn
     *      * error
     *      * fatal
     *
     * It will set the corresponding level. It is case insensitive.
     * @returns {number}
     */
    private getQueryStringLogLevel(): number {
        const params: any = UrlUtil.getQueryStringParams();
        const logLevel: string = params.debug ? "debug" : params.logLevel || "";

        switch (logLevel.toLowerCase()) {
            case "all":
                return Logger.LEVEL_ALL;

            case "debug":
                return Logger.LEVEL_DEBUG;

            case "info":
                return Logger.LEVEL_INFO;

            case "warn":
                return Logger.LEVEL_WARN;

            case "error":
                return Logger.LEVEL_ERROR;

            case "fatal":
                return Logger.LEVEL_FATAL;

            default:
                return Logger.LEVEL_ALL;
        }
    }

    public getLogger(context: string) {
        return Logger.getLogger(context);
    }

    /**
     * Debug.
     */
    public debug(...args: any[]): void {
        this.logIt(Logger.LEVEL_DEBUG, args);
    }

    /**
     * Info.
     */
    public info(...args: any[]): void {
        this.logIt(Logger.LEVEL_INFO, args);
    }

    /**
     * Warn.
     */
    public warn(...args: any[]): void {
        this.logIt(Logger.LEVEL_WARN, args);
    }

    /**
     * Error.
     */
    public error(...args: any[]): void {
        this.logIt(Logger.LEVEL_ERROR, args);
    }

    /**
     * Log the user out.
     *
     * TODO: BMR: 02/09/2017: Consider using return console.log.bind(console, ...consoleArgs); -- details below.
     *
     * Something like:
     *
     * This function returns the bound console.log, which requires to do getLog(...)(). instead of logging directly
     * from here, which would be log(...), to preserve the correct file name and line number in the logs lines.
     */
    private logIt(level: number, ...args: any[]): void {
        const validLevel = level >= Logger.LEVEL;
        const isUnitTest = this.isRunningUnitTest();

        /* tslint:disable */
        // Don't allow logging if it's not enabled or not a valid level.
        if (Logger.isEnabled && validLevel && !isUnitTest) {
            const msg = Logger.getPrintFriendlyLogStatement(this.context, level, args[0][0]);

            // determine the log level and log to the console accordingly

            switch (level) {
                case Logger.LEVEL_INFO:
                    console.info(msg);
                    break;

                case Logger.LEVEL_WARN:
                    console.warn(msg);
                    break;

                case Logger.LEVEL_ERROR:
                case Logger.LEVEL_FATAL:
                    console.error(msg);
                    break;

                default:
                    console.log(msg);
                    break;
            }
        } else if (!Logger.didWarnLoggingOff) {
            Logger.didWarnLoggingOff = true;
            if (isUnitTest) {
                console.warn(
                    "Logging is OFF due to this being a Unit Test." +
                        "\n" +
                        "NOTE: You can turn it back on by opening `logger.ts` and finding the check on the prop `isUnitTest`."
                );
            } else if (!Logger.isEnabled) {
                console.warn("Logging is OFF due to Logging being globally disabled.");
            }
        }
        /* tslint:enable */
    }

    /**
     * Determines if the app is running in unit test mode.
     */
    private isRunningUnitTest(): boolean {
        return this.checkGlobalNamespaceForProp("jasmine") || this.checkGlobalNamespaceForProp("__karma__");
    }

    /**
     * Checks for the existence of global window objects.
     * @param prop
     */
    private checkGlobalNamespaceForProp(prop: string): boolean {
        return !!window[prop];
    }
}
