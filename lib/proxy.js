const proxy = require('http-proxy-middleware');
const path = require('path');

/**
 * http-proxy-middleware based UI5 Server middleware
 *
 * @param {Object} parameters Parameters
 * @param {Object} parameters.resources Resource collections
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.all Reader or Collection to read resources of the
 *                                        root project and its dependencies
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.rootProject Reader or Collection to read resources of
 *                                        the project the server is started in
 * @param {module:@ui5/fs.AbstractReader} parameters.resources.dependencies Reader or Collection to read resources of
 *                                        the projects dependencies
 * @param {Object} parameters.options Options
 * @param {string} [parameters.options.configuration] Custom server middleware configuration if given in ui5.yaml
 * @returns {function} Middleware function to use
 */
module.exports = function({resources, options}) {
    const proxyOptions = {selfHandleResponse: true};
    if(options.configuration.logProvider === 'ui5') {
        const log = require("@ui5/logger").getLogger("server:custommiddleware:hpm-proxy");
        proxyOptions.logProvider = function() {
            return log;
        }
    }
    delete options.configuration.logProvider;
    Object.assign(proxyOptions, options.configuration);
    
    proxyOptions.onError = function(err, req, res) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end(
          'Something went wrong. And we are reporting a custom error message.'
        );
      }

    proxyOptions.onProxyRes = function(proxyRes, req, res, next) {
        if(proxyRes.statusCode === 404) {
            req.next();
        }    
        else {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        }
    }
   
    const proxyApi = proxy(proxyOptions);
    return function (req, res, next) {
        proxyApi(req, res, next);
    }   
};
