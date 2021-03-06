"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.upload = exports.postUpload = exports.getUpload = exports.video = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _videos;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({});

          case 3:
            _videos = _context.sent;
            res.render("home", {
              pageTitle: 'Home',
              videos: _videos
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: 'Home',
              videos: videos
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = function search(req, res) {
  var searchingBy = req.query.term;
  res.render("search", {
    pageTitle: 'Search',
    searchingBy: searchingBy,
    videos: videos
  });
};

exports.search = search;

var video = function video(req, res) {
  return res.render("video", {
    pageTitle: 'Videos'
  });
};

exports.video = video;

var getUpload = function getUpload(req, res) {
  res.render("upload", {
    pageTitle: 'Upload'
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context2.next = 3;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context2.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var upload = function upload(req, res) {
  return res.render("upload", {
    pageTitle: 'Upload'
  });
};

exports.upload = upload;

var videoDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, _video;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Video["default"].findById(id).populate("creator").populate("comments");

          case 4:
            _video = _context3.sent;
            res.render("videoDetail", {
              pageTitle: 'Video Detail',
              video: _video
            });
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            console.log("######################################################################"); //console.log(error);
            //res.redirect(routes.home);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function videoDetail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Edit Video


exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _video2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video2 = _context4.sent;

            if (!(_video2.creator.toString() !== req.user.id)) {
              _context4.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editVideo", {
              pageTitle: "Edit ".concat(_video2.title),
              video: _video2
            });

          case 10:
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function getEditVideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function postEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _video3;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video3 = _context6.sent;

            if (!(_video3.creator.toString() !== req.user.id)) {
              _context6.next = 9;
              break;
            }

            throw Error();

          case 9:
            _context6.next = 11;
            return _Video["default"].findOneAndRemove({
              _id: id
            });

          case 11:
            _context6.next = 16;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);

          case 16:
            res.redirect(_routes["default"].home);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 13]]);
  }));

  return function deleteVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Register Video View


exports.deleteVideo = deleteVideo;

var postRegisterView = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _video4;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video4 = _context7.sent;
            _video4.views += 1;

            _video4.save();

            res.status(200);
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            res.status(400);

          case 13:
            _context7.prev = 13;
            res.end();
            return _context7.finish(13);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); // Add Comment


exports.postRegisterView = postRegisterView;

var postAddComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, comment, user, _video5, newComment;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video5 = _context8.sent;
            _context8.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id
            });

          case 7:
            newComment = _context8.sent;

            _video5.comments.push(newComment.id);

            _video5.save();

            console.log('HI');
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 16:
            _context8.prev = 16;
            res.end();
            return _context8.finish(16);

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13, 16, 19]]);
  }));

  return function postAddComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;