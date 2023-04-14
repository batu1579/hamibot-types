/*
 * @Author: Hamibot hello@hamibot.com
 * @CreateDate: 2022-06-09 13:31:43
 * @LastEditors: BATU1579
 * @LastTime: 2023-04-14 15:15:23
 * @FilePath: \\types\\http.d.ts
 * @Description: 网络操作模块
 * 
 * Copyright (c) 2022 by Hamibot hello@hamibot.com, All Rights Reserved. 
 */
declare module 'http' {
    import { ByteArray } from 'files';
    import { PWritableTextFile, ReadableTextFile } from 'files';

    global {
        /**
         * @description: http 模块提供一些进行 http 请求的函数。
         */
        const http: Http;
    }

    interface Http {
        /**
         * @description: 对地址 `url` 进行一次 HTTP GET 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * console.show();
         * let r = http.get('www.baidu.com');
         * log('code = ' + r.statusCode);
         * log('html = ' + r.body.string());
         * ```
         * @example
         * ```typescript
         * // 使用回调函数显示响应信息
         * console.show();
         * http.get('www.baidu.com', {}, function(res, err) {
         *     if (err) {
         *         console.error(err);
         *         return;
         *     }
         *     log('code = ' + res.statusCode);
         *     log('html = ' + res.body.string());
         * });
         * ```
         * @example
         * ```typescript
         * // 设置 HTTP 头部信息
         * console.show();
         * let r = http.get('www.baidu.com', {
         *     headers: {
         *         'Accept-Language': 'zh-cn,zh;q=0.5',
         *         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.84 Safari/537.36',
         *     },
         * });
         * log('code = ' + r.statusCode);
         * log('html = ' + r.body.string());
         * ```
         */
        get(url: string, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 对地址 `url` 进行一次 HTTP POST 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。其中 POST 数据可以是字符串或键值对。具体含义取决于 `options.contentType` 的值。默认为'application/x-www-form-urlencoded', 这种方式是 JQuery 的 ajax 函数的默认方式。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {unknown} data POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 模拟表单提交登录淘宝
         * var url = 'https://login.taobao.com/member/login.jhtml';
         * let username = '你的用户名';
         * let password = '你的密码';
         * let res = http.post(url, {
         *     TPL_username: username,
         *     TPL_password: password,
         * });
         * let html = res.body.string();
         * if (html.contains('页面跳转中')) {
         *     toast('登录成功');
         * } else {
         *     toast('登录失败');
         * }
         * ```
         */
        post(url: string, data: unknown, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 以 JSON 格式向目标 `Url` 发起 POST 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。JSON 格式指的是，将会调用 `JSON.stringify()` 把 `data` 对象转换为 JSON 字符串，并在 HTTP 头部信息中把'Content-Type'属性置为'application/json'。这种方式是 AngularJS 的 ajax 函数的默认方式。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {object} data POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 调用图灵机器人接口
         * let url = 'http://www.tuling123.com/openapi/api';
         * r = http.postJson(url, {
         *     key: 'key',
         *     info: '你好啊',
         *     userid: '1',
         * });
         * toastLog(r.body.string());
         * ```
         */
        postJson(url: string, data: object, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 向目标地址发起类型为 multipart/form-data 的请求（通常用于文件上传等）, 其中 files 参数是<name1: value1, name2: value2, ...>的键值对，value 的格式可以是以下几种情况：
         *  - 文件类型，即 `open()` 返回的类型
         *  - [fileName, filePath]
         *  - [fileName, mimeType, filePath]
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {FileOptions} files POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 文件类型
         * let res = http.postMultipart(url, {
         *     file: open('/sdcard/1.txt'),
         * });
         * log(res.body.string());
         * ```
         * @example
         * ```typescript
         * // [fileName, filePath]
         * let res = http.postMultipart(url, {
         *     file: ['1.txt', '/sdcard/1.txt'],
         * });
         * log(res.body.string());
         * ```
         * @example
         * ```typescript
         * // [fileName, mimeType, filePath]
         * var res = http.postMultipart(url, {
         *     file: ['1.txt', 'text/plain', '/sdcard/1.txt'],
         * });
         * log(res.body.string());
         * ```
         */
        postMultipart(url: string, files: FileOptions, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 对目标地址 url 发起一次 HTTP 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。
         * 
         * **注意！：**
         * 
         * - 该函数是 get, post, postJson 等函数的基础函数。因此除非是 PUT, DELET 等请求，或者需要更高定制的 HTTP 请求，否则直接使用 get, post, postJson 等函数会更加方便
         * 
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         */
        request(url: string, options?: HttpRequestOptionsWithMethod, callback?: (res: Response) => any): Response;
    }

    /**
     * @description: HTTP 请求的响应。
     */
    interface Response {
        /**
         * @description: 当前响应的 HTTP 状态码。例如 200（OK）, 404（Not Found）等。有关 HTTP 状态码的信息，参见 [HTTP 响应代码] 。
         * 
         * [HTTP 响应代码]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
         */
        readonly statusCode: number;

        /**
         * @description: 当前响应的 HTTP 状态信息。例如'OK', 'Bad Request', 'Forbidden'。有关 HTTP 状态码的信息，参见 [HTTP 响应代码] 。
         * 
         * [HTTP 响应代码]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
         * @example
         * ```typescript
         * let res = http.get('www.baidu.com');
         * if (res.statusCode >= 200 && res.statusCode < 300) {
         *     toast('页面获取成功!');
         * } else if (res.statusCode == 404) {
         *     toast('页面没找到哦...');
         * } else {
         *     toast('错误: ' + res.statusCode + ' ' + res.statusMessage);
         * }
         * ```
         */
        readonly statusMessage: string;

        /**
         * @description: 当前响应的 HTTP 头部信息。该对象的键是响应头名称，值是各自的响应头值。
         * @example
         * ```typescript
         * console.show();
         * let res = http.get('www.qq.com');
         * console.log('HTTP Headers:');
         * for (var headerName in res.headers) {
         *     console.log('%s: %s', headerName, res.headers[headerName]);
         * }
         * ```
         */
        readonly headers: object;

        /**
         * @description: 当前响应的内容。
         */
        readonly body: ResponseBody;

        /**
         * @description: 当前响应所对应的请求。
         */
        // TODO(BATU1579): 查看具体的成员。
        readonly request: object;

        /**
         * @description: 当前响应所对应的请求 URL。
         */
        readonly url: string;

        /**
         * @description: 当前响应所对应的 HTTP 请求的方法。例如'GET', 'POST', 'PUT'等。
         */
        readonly method: MethodType;
    }

    interface HttpRequestOptions {
        /**
         * @description: 键值对形式的 HTTP 头部信息。有关 HTTP 头部信息，参见 [HTTP Headers] 。
         * 
         * [HTTP Headers]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers
         */
        headers: object;

        /**
         * @description: HTTP 头部信息中的'Content-Type', 表示 HTTP 请求的内容类型。例如'text/plain', 'application/json'。更多信息参见 [Content-Type] 。
         * 
         * [Content-Type]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type
         */
        contentType: ContentType;

        // TODO: 明确函数定义。
        /**
         * @description: HTTP 请求的内容。可以是一个字符串，也可以是一个字节数组；或者是一个以 [BufferedSink] 为参数的函数。
         * 
         * [BufferedSink]: https://github.com/square/okio/blob/master/okio/src/main/java/okio/BufferedSink.java
         */
    }

    interface HttpRequestOptionsWithMethod extends HttpRequestOptions {
        /**
         * @description: HTTP 请求方法。
         */
        method: MethodType;
    }

    // TODO: 检查多文件传输的情况
    interface FileOptions {
        file: (
            ReadableTextFile |
            PWritableTextFile |
            [string, string] |
            [string, string, string]
        );
        [prop: string]: any;
    }

    interface ResponseBody {
        /**
         * @description: 以字节数组形式返回响应内容
         */
        bytes(): ByteArray;

        /**
         * @description: 以字符串形式返回响应内容
         */
        string(): string;

        /**
         * @description: 把响应内容作为 JSON 格式的数据并调用 JSON.parse，返回解析后的对象
         */
        json(): {
            [prop: string]: any
        };

        /**
         * @description: 当前响应的内容类型
         */
        readonly contentType: ContentType;
    }
}

type MethodType =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'
    | 'TRACE'
    | 'CONNECT'

type ContentType =
    | 'application/xhtml+xml'
    | 'application/atom+xml'
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'application/octet-stream'                    // .*
    | 'image/tiff'                                  // .tif
    | 'application/x-001'                           // .001
    | 'application/x-301'                           // .301
    | 'text/h323'                                   // .323
    | 'application/x-906'                           // .906
    | 'drawing/907'                                 // .907
    | 'application/x-a11'                           // .a11
    | 'audio/x-mei-aac'                             // .acp
    | 'application/postscript'                      // .ai
    | 'audio/aiff'                                  // .aif
    | 'audio/aiff'                                  // .aifc
    | 'audio/aiff'                                  // .aiff
    | 'application/x-anv'                           // .anv
    | 'text/asa'                                    // .asa
    | 'video/x-ms-asf'                              // .asf
    | 'text/asp'                                    // .asp
    | 'video/x-ms-asf'                              // .asx
    | 'audio/basic'                                 // .au
    | 'video/avi'                                   // .avi
    | 'application/vnd.adobe.workflow'              // .awf
    | 'text/xml'                                    // .biz
    | 'application/x-bmp'                           // .bmp
    | 'application/x-bot'                           // .bot
    | 'application/x-c4t'                           // .c4t
    | 'application/x-c90'                           // .c90
    | 'application/x-cals'                          // .cal
    | 'application/vnd.ms-pki.seccat'               // .cat
    | 'application/x-netcdf'                        // .cdf
    | 'application/x-cdr'                           // .cdr
    | 'application/x-cel'                           // .cel
    | 'application/x-x509-ca-cert'                  // .cer
    | 'application/x-g4'                            // .cg4
    | 'application/x-cgm'                           // .cgm
    | 'application/x-cit'                           // .cit
    | 'java/*'                                      // .class
    | 'text/xml'                                    // .cml
    | 'application/x-cmp'                           // .cmp
    | 'application/x-cmx'                           // .cmx
    | 'application/x-cot'                           // .cot
    | 'application/pkix-crl'                        // .crl
    | 'application/x-x509-ca-cert'                  // .crt
    | 'application/x-csi'                           // .csi
    | 'text/css'                                    // .css
    | 'application/x-cut'                           // .cut
    | 'application/x-dbf'                           // .dbf
    | 'application/x-dbm'                           // .dbm
    | 'application/x-dbx'                           // .dbx
    | 'text/xml'                                    // .dcd
    | 'application/x-dcx'                           // .dcx
    | 'application/x-x509-ca-cert'                  // .der
    | 'application/x-dgn'                           // .dgn
    | 'application/x-dib'                           // .dib
    | 'application/x-msdownload'                    // .dll
    | 'application/msword'                          // .doc
    | 'application/msword'                          // .dot
    | 'application/x-drw'                           // .drw
    | 'text/xml'                                    // .dtd
    | 'Model/vnd.dwf'                               // .dwf
    | 'application/x-dwf'                           // .dwf
    | 'application/x-dwg'                           // .dwg
    | 'application/x-dxb'                           // .dxb
    | 'application/x-dxf'                           // .dxf
    | 'application/vnd.adobe.edn'                   // .edn
    | 'application/x-emf'                           // .emf
    | 'message/rfc822'                              // .eml
    | 'text/xml'                                    // .ent
    | 'application/x-epi'                           // .epi
    | 'application/x-ps'                            // .eps
    | 'application/postscript'                      // .eps
    | 'application/x-ebx'                           // .etd
    | 'application/x-msdownload'                    // .exe
    | 'image/fax'                                   // .fax
    | 'application/vnd.fdf'                         // .fdf
    | 'application/fractals'                        // .fif
    | 'text/xml'                                    // .fo
    | 'application/x-frm'                           // .frm
    | 'application/x-g4'                            // .g4
    | 'application/x-gbr'                           // .gbr
    | 'application/x-'                              // .
    | 'image/gif'                                   // .gif
    | 'application/x-gl2'                           // .gl2
    | 'application/x-gp4'                           // .gp4
    | 'application/x-hgl'                           // .hgl
    | 'application/x-hmr'                           // .hmr
    | 'application/x-hpgl'                          // .hpg
    | 'application/x-hpl'                           // .hpl
    | 'application/mac-binhex40'                    // .hqx
    | 'application/x-hrf'                           // .hrf
    | 'application/hta'                             // .hta
    | 'text/x-component'                            // .htc
    | 'text/html'                                   // .htm
    | 'text/html'                                   // .html
    | 'text/webviewhtml'                            // .htt
    | 'text/html'                                   // .htx
    | 'application/x-icb'                           // .icb
    | 'image/x-icon'                                // .ico
    | 'application/x-ico'                           // .ico
    | 'application/x-iff'                           // .iff
    | 'application/x-g4'                            // .ig4
    | 'application/x-igs'                           // .igs
    | 'application/x-iphone'                        // .iii
    | 'application/x-img'                           // .img
    | 'application/x-internet-signup'               // .ins
    | 'application/x-internet-signup'               // .isp
    | 'video/x-ivf'                                 // .IVF
    | 'java/*'                                      // .java
    | 'image/jpeg'                                  // .jfif
    | 'image/jpeg'                                  // .jpe
    | 'application/x-jpe'                           // .jpe
    | 'image/jpeg'                                  // .jpeg
    | 'image/jpeg'                                  // .jpg
    | 'application/x-jpg'                           // .jpg
    | 'application/x-javascript'                    // .js
    | 'text/html'                                   // .jsp
    | 'audio/x-liquid-file'                         // .la1
    | 'application/x-laplayer-reg'                  // .lar
    | 'application/x-latex'                         // .latex
    | 'audio/x-liquid-secure'                       // .lavs
    | 'application/x-lbm'                           // .lbm
    | 'audio/x-la-lms'                              // .lmsff
    | 'application/x-javascript'                    // .ls
    | 'application/x-ltr'                           // .ltr
    | 'video/x-mpeg'                                // .m1v
    | 'video/x-mpeg'                                // .m2v
    | 'audio/mpegurl'                               // .m3u
    | 'video/mpeg4'                                 // .m4e
    | 'application/x-mac'                           // .mac
    | 'application/x-troff-man'                     // .man
    | 'text/xml'                                    // .math
    | 'application/msaccess'                        // .mdb
    | 'application/x-mdb'                           // .mdb
    | 'application/x-shockwave-flash'               // .mfp
    | 'message/rfc822'                              // .mht
    | 'message/rfc822'                              // .mhtml
    | 'application/x-mi'                            // .mi
    | 'audio/mid'                                   // .mid
    | 'audio/mid'                                   // .midi
    | 'application/x-mil'                           // .mil
    | 'text/xml'                                    // .mml
    | 'audio/x-musicnet-download'                   // .mnd
    | 'audio/x-musicnet-stream'                     // .mns
    | 'application/x-javascript'                    // .mocha
    | 'video/x-sgi-movie'                           // .movie
    | 'audio/mp1'                                   // .mp1
    | 'audio/mp2'                                   // .mp2
    | 'video/mpeg'                                  // .mp2v
    | 'audio/mp3'                                   // .mp3
    | 'video/mpeg4'                                 // .mp4
    | 'video/x-mpg'                                 // .mpa
    | 'application/vnd.ms-project'                  // .mpd
    | 'video/x-mpeg'                                // .mpe
    | 'video/mpg'                                   // .mpeg
    | 'video/mpg'                                   // .mpg
    | 'audio/rn-mpeg'                               // .mpga
    | 'application/vnd.ms-project'                  // .mpp
    | 'video/x-mpeg'                                // .mps
    | 'application/vnd.ms-project'                  // .mpt
    | 'video/mpg'                                   // .mpv
    | 'video/mpeg'                                  // .mpv2
    | 'application/vnd.ms-project'                  // .mpw
    | 'application/vnd.ms-project'                  // .mpx
    | 'text/xml'                                    // .mtx
    | 'application/x-mmxp'                          // .mxp
    | 'image/pnetvue'                               // .net
    | 'application/x-nrf'                           // .nrf
    | 'message/rfc822'                              // .nws
    | 'text/x-ms-odc'                               // .odc
    | 'application/x-out'                           // .out
    | 'application/pkcs10'                          // .p10
    | 'application/x-pkcs12'                        // .p12
    | 'application/x-pkcs7-certificates'            // .p7b
    | 'application/pkcs7-mime'                      // .p7c
    | 'application/pkcs7-mime'                      // .p7m
    | 'application/x-pkcs7-certreqresp'             // .p7r
    | 'application/pkcs7-signature'                 // .p7s
    | 'application/x-pc5'                           // .pc5
    | 'application/x-pci'                           // .pci
    | 'application/x-pcl'                           // .pcl
    | 'application/x-pcx'                           // .pcx
    | 'application/pdf'                             // .pdf
    | 'application/pdf'                             // .pdf
    | 'application/vnd.adobe.pdx'                   // .pdx
    | 'application/x-pkcs12'                        // .pfx
    | 'application/x-pgl'                           // .pgl
    | 'application/x-pic'                           // .pic
    | 'application/vnd.ms-pki.pko'                  // .pko
    | 'application/x-perl'                          // .pl
    | 'text/html'                                   // .plg
    | 'audio/scpls'                                 // .pls
    | 'application/x-plt'                           // .plt
    | 'image/png'                                   // .png
    | 'application/x-png'                           // .png
    | 'application/vnd.ms-powerpoint'               // .pot
    | 'application/vnd.ms-powerpoint'               // .ppa
    | 'application/x-ppm'                           // .ppm
    | 'application/vnd.ms-powerpoint'               // .pps
    | 'application/vnd.ms-powerpoint'               // .ppt
    | 'application/x-ppt'                           // .ppt
    | 'application/x-pr'                            // .pr
    | 'application/pics-rules'                      // .prf
    | 'application/x-prn'                           // .prn
    | 'application/x-prt'                           // .prt
    | 'application/x-ps'                            // .ps
    | 'application/postscript'                      // .ps
    | 'application/x-ptn'                           // .ptn
    | 'application/vnd.ms-powerpoint'               // .pwz
    | 'text/vnd.rn-realtext3d'                      // .r3t
    | 'audio/vnd.rn-realaudio'                      // .ra
    | 'audio/x-pn-realaudio'                        // .ram
    | 'application/x-ras'                           // .ras
    | 'application/rat-file'                        // .rat
    | 'text/xml'                                    // .rdf
    | 'application/vnd.rn-recording'                // .rec
    | 'application/x-red'                           // .red
    | 'application/x-rgb'                           // .rgb
    | 'application/vnd.rn-realsystem-rjs'           // .rjs
    | 'application/vnd.rn-realsystem-rjt'           // .rjt
    | 'application/x-rlc'                           // .rlc
    | 'application/x-rle'                           // .rle
    | 'application/vnd.rn-realmedia'                // .rm
    | 'application/vnd.adobe.rmf'                   // .rmf
    | 'audio/mid'                                   // .rmi
    | 'application/vnd.rn-realsystem-rmj'           // .rmj
    | 'audio/x-pn-realaudio'                        // .rmm
    | 'application/vnd.rn-rn_music_package'         // .rmp
    | 'application/vnd.rn-realmedia-secure'         // .rms
    | 'application/vnd.rn-realmedia-vbr'            // .rmvb
    | 'application/vnd.rn-realsystem-rmx'           // .rmx
    | 'application/vnd.rn-realplayer'               // .rnx
    | 'image/vnd.rn-realpix'                        // .rp
    | 'audio/x-pn-realaudio-plugin'                 // .rpm
    | 'application/vnd.rn-rsml'                     // .rsml
    | 'text/vnd.rn-realtext'                        // .rt
    | 'application/msword'                          // .rtf
    | 'application/x-rtf'                           // .rtf
    | 'video/vnd.rn-realvideo'                      // .rv
    | 'application/x-sam'                           // .sam
    | 'application/x-sat'                           // .sat
    | 'application/sdp'                             // .sdp
    | 'application/x-sdw'                           // .sdw
    | 'application/x-stuffit'                       // .sit
    | 'application/x-slb'                           // .slb
    | 'application/x-sld'                           // .sld
    | 'drawing/x-slk'                               // .slk
    | 'application/smil'                            // .smi
    | 'application/smil'                            // .smil
    | 'application/x-smk'                           // .smk
    | 'audio/basic'                                 // .snd
    | 'text/plain'                                  // .sol
    | 'text/plain'                                  // .sor
    | 'application/x-pkcs7-certificates'            // .spc
    | 'application/futuresplash'                    // .spl
    | 'text/xml'                                    // .spp
    | 'application/streamingmedia'                  // .ssm
    | 'application/vnd.ms-pki.certstore'            // .sst
    | 'application/vnd.ms-pki.stl'                  // .stl
    | 'text/html'                                   // .stm
    | 'application/x-sty'                           // .sty
    | 'text/xml'                                    // .svg
    | 'application/x-shockwave-flash'               // .swf
    | 'application/x-tdf'                           // .tdf
    | 'application/x-tg4'                           // .tg4
    | 'application/x-tga'                           // .tga
    | 'image/tiff'                                  // .tif
    | 'application/x-tif'                           // .tif
    | 'image/tiff'                                  // .tiff
    | 'text/xml'                                    // .tld
    | 'drawing/x-top'                               // .top
    | 'application/x-bittorrent'                    // .torrent
    | 'text/xml'                                    // .tsd
    | 'text/plain'                                  // .txt
    | 'application/x-icq'                           // .uin
    | 'text/iuls'                                   // .uls
    | 'text/x-vcard'                                // .vcf
    | 'application/x-vda'                           // .vda
    | 'application/vnd.visio'                       // .vdx
    | 'text/xml'                                    // .vml
    | 'application/x-vpeg005'                       // .vpg
    | 'application/vnd.visio'                       // .vsd
    | 'application/x-vsd'                           // .vsd
    | 'application/vnd.visio'                       // .vss
    | 'application/vnd.visio'                       // .vst
    | 'application/x-vst'                           // .vst
    | 'application/vnd.visio'                       // .vsw
    | 'application/vnd.visio'                       // .vsx
    | 'application/vnd.visio'                       // .vtx
    | 'text/xml'                                    // .vxml
    | 'audio/wav'                                   // .wav
    | 'audio/x-ms-wax'                              // .wax
    | 'application/x-wb1'                           // .wb1
    | 'application/x-wb2'                           // .wb2
    | 'application/x-wb3'                           // .wb3
    | 'image/vnd.wap.wbmp'                          // .wbmp
    | 'application/msword'                          // .wiz
    | 'application/x-wk3'                           // .wk3
    | 'application/x-wk4'                           // .wk4
    | 'application/x-wkq'                           // .wkq
    | 'application/x-wks'                           // .wks
    | 'video/x-ms-wm'                               // .wm
    | 'audio/x-ms-wma'                              // .wma
    | 'application/x-ms-wmd'                        // .wmd
    | 'application/x-wmf'                           // .wmf
    | 'text/vnd.wap.wml'                            // .wml
    | 'video/x-ms-wmv'                              // .wmv
    | 'video/x-ms-wmx'                              // .wmx
    | 'application/x-ms-wmz'                        // .wmz
    | 'application/x-wp6'                           // .wp6
    | 'application/x-wpd'                           // .wpd
    | 'application/x-wpg'                           // .wpg
    | 'application/vnd.ms-wpl'                      // .wpl
    | 'application/x-wq1'                           // .wq1
    | 'application/x-wr1'                           // .wr1
    | 'application/x-wri'                           // .wri
    | 'application/x-wrk'                           // .wrk
    | 'application/x-ws'                            // .ws
    | 'application/x-ws'                            // .ws2
    | 'text/scriptlet'                              // .wsc
    | 'text/xml'                                    // .wsdl
    | 'video/x-ms-wvx'                              // .wvx
    | 'application/vnd.adobe.xdp'                   // .xdp
    | 'text/xml'                                    // .xdr
    | 'application/vnd.adobe.xfd'                   // .xfd
    | 'application/vnd.adobe.xfdf'                  // .xfdf
    | 'text/html'                                   // .xhtml
    | 'application/vnd.ms-excel'                    // .xls
    | 'application/x-xls'                           // .xls
    | 'application/x-xlw'                           // .xlw
    | 'text/xml'                                    // .xml
    | 'audio/scpls'                                 // .xpl
    | 'text/xml'                                    // .xq
    | 'text/xml'                                    // .xql
    | 'text/xml'                                    // .xquery
    | 'text/xml'                                    // .xsd
    | 'text/xml'                                    // .xsl
    | 'text/xml'                                    // .xslt
    | 'application/x-xwd'                           // .xwd
    | 'application/x-x_b'                           // .x_b
    | 'application/vnd.symbian.install'             // .sis
    | 'application/vnd.symbian.install'             // .sisx
    | 'application/x-x_t'                           // .x_t
    | 'application/vnd.iphone'                      // .ipa
    | 'application/vnd.android.package-archive'     // .apk
    | 'application/x-silverlight-app'               // .xap
