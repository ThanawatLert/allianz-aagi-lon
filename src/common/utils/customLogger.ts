// ...
import { ConsoleLogger } from '@nestjs/common';

/**
 * A custom logger that disables all logs emitted by calling `log` method if
 * they use one of the following contexts:
 * - `InstanceLoader`
 * - `RoutesResolver`
 * - `RouterExplorer`
 * - `NestFactory`
 */
export class CustomLogger extends ConsoleLogger {
  static contextsToIgnore = [
    'InstanceLoader',
    'RoutesResolver',
    'RouterExplorer',
    'NestFactory', // I prefer not including this one
  ];

  log(_: any, context?: string): void {
    if (!CustomLogger.contextsToIgnore.includes(context)) {
      super.log.apply(this, arguments);
    }
  }
}
