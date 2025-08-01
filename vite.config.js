import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  root: '.',
  publicDir: 'production',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    // Optimize source maps: 'hidden' for production (generates but doesn't reference in bundle)
    // This allows debugging in production without exposing source maps to users
    sourcemap: process.env.NODE_ENV === 'production' ? 'hidden' : true,
    target: 'es2022',
    rollupOptions: {
      plugins: [
        // Bundle analyzer - generates stats.html file
        visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap' // 'treemap', 'sunburst', 'network'
        })
      ],
      output: {
        manualChunks: {
          'vendor-core': ['bootstrap', '@popperjs/core'],
          'vendor-charts': ['chart.js', 'echarts', 'leaflet'],
          'vendor-forms': ['select2', 'ion-rangeslider', 'autosize', 'switchery', '@eonasdan/tempus-dominus'],
          'vendor-ui': ['nprogress', 'datatables.net', 'datatables.net-bs5'],
          'vendor-utils': ['dayjs', 'skycons']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      },
      input: {
        main: 'production/index.html',
        index2: 'production/index2.html',
        index3: 'production/index3.html',
        index4: 'production/index4.html',
        
        form: 'production/form.html',
        form_advanced: 'production/form_advanced.html',
        form_buttons: 'production/form_buttons.html',
        form_upload: 'production/form_upload.html',
        form_validation: 'production/form_validation.html',
        form_wizards: 'production/form_wizards.html',
        
        general_elements: 'production/general_elements.html',
        media_gallery: 'production/media_gallery.html',
        typography: 'production/typography.html',
        icons: 'production/icons.html',

        widgets: 'production/widgets.html',
        invoice: 'production/invoice.html',
        inbox: 'production/inbox.html',
        calendar: 'production/calendar.html',
        
        tables: 'production/tables.html',
        tables_dynamic: 'production/tables_dynamic.html',
        
        chartjs: 'production/chartjs.html',
        chartjs2: 'production/chartjs2.html',
        chart3: 'production/chart3.html',
        echarts: 'production/echarts.html',
        other_charts: 'production/other_charts.html',
        
        fixed_sidebar: 'production/fixed_sidebar.html',
        fixed_footer: 'production/fixed_footer.html',
        
        e_commerce: 'production/e_commerce.html',
        projects: 'production/projects.html',
        project_detail: 'production/project_detail.html',
        contacts: 'production/contacts.html',
        profile: 'production/profile.html',
        
        page_403: 'production/page_403.html',
        page_404: 'production/page_404.html',
        page_500: 'production/page_500.html',
        plain_page: 'production/plain_page.html',
        login: 'production/login.html',
        pricing_tables: 'production/pricing_tables.html',
        
        level2: 'production/level2.html',
        sidebar_test: 'production/sidebar_test.html',
        map: 'production/map.html',
        xx: 'production/xx.html'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  esbuild: {
    target: 'es2022'
  },
  server: {
    open: '/production/index.html',
    port: 3000
  },
  optimizeDeps: {
    include: [
      'bootstrap',
      '@popperjs/core',
      'dayjs',
      'nprogress'
    ],
    force: true
  },
  resolve: {
    // Modern build without jQuery aliases
  },
  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Silence Sass deprecation warnings
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
        // Additional settings for better performance
        includePaths: ['node_modules'],
        // Generate source maps for better debugging
        sourceMap: true,
        sourceMapContents: true
      }
    }
  },
  define: {
    global: 'globalThis',
    process: JSON.stringify({
      env: {
        NODE_ENV: 'production'
      }
    }),
    'process.env': JSON.stringify({
      NODE_ENV: 'production'
    }),
    'process.env.NODE_ENV': '"production"'
  }
}); 