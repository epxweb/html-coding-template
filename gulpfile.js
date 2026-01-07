const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const del = require('del');

// パス設定
const paths = {
  scss: {
    src: 'src/assets/scss/**/*.scss', // 監視・コンパイル元
    dest: 'src/assets/css'            // 出力先
  },
  html: {
    src: 'src/**/*.html'
  },
  js: {
    src: 'src/assets/js/**/*.js'
  }
};

// Sassコンパイルタスク
function compileSass() {
  return gulp.src(paths.scss.src)
    // エラーハンドリング（エラーが出てもタスクを止めず、通知を出す）
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Gulp Error",
        message: "Error: <%= error.message %>"
      })
    }))
    // Sassコンパイル（Prepros設定: outputStyle: expanded）
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    // ベンダープレフィックス付与（Prepros設定: grid: autoplace, last 2 versions）
    .pipe(postcss([
      autoprefixer({
        cascade: true,
        grid: 'autoplace'
      })
    ]))
    // 出力
    .pipe(gulp.dest(paths.scss.dest))
    // ブラウザにスタイルを注入（リロードなしで反映）
    .pipe(browserSync.stream());
}

// ローカルサーバー＆監視タスク
function serve() {
  // サーバー起動
  browserSync.init({
    server: {
      baseDir: "./src" // srcディレクトリをルートにする
    },
    notify: false, // ブラウザ右上の通知をオフ
    open: true     // 自動でブラウザを開く
  });

  // ファイル監視
  gulp.watch(paths.scss.src, compileSass);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
  gulp.watch(paths.js.src).on('change', browserSync.reload);
}

// distフォルダを空にする
function clean(done) {
  del.sync(['dist']);
  done();
}

// 納品用ビルドタスク（Sassコンパイル後にコピー）
function copyFiles() {
  console.log('Building for production to ./dist folder...');
  return gulp.src([
    'src/**/*.html',
    'src/assets/css/**/*',
    'src/assets/js/**/*',
    'src/assets/images/**/*'
  ], { base: 'src' }) // baseをsrcに設定してディレクトリ構造を維持
  .pipe(gulp.dest('dist'));
}

const build = gulp.series(clean, compileSass, copyFiles);

// デフォルトタスク（npx gulp で実行されるタスク）
exports.default = serve;
exports.build = build;