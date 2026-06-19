// src/app/(frontend)/layout.tsx

import React from 'react'
import './styles.css'
import { languages } from '@/config/languages'
import Navbar from './components/Navbar/Navbar1'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground'
import { getPayload } from 'payload'
import config from '../../payload.config'
import AdSenseAuto from '../../components/AdSenseAuto'
import GoogleAnalytics from '../../components/GoogleAnalytics'
import { getSiteSettings } from '@/lib/getSiteSettings'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Spoilers & Επόμενα Επεισόδια για Τηλεοπτικές Σειρές',
  description:
    'Το απόλυτο σημείο για spoilers και τηλεοπτικές σειρές! Μάθετε πρώτοι τις καταιγιστικές και περιλήψεις για όλα τα ελληνικά σίριαλ.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG || 'en'
  const activeLang = languages.find((l) => l.code === langCode) || languages[0]

  const payload = await getPayload({ config })
  const settings = await getSiteSettings()

  const siteSettings = await payload.findGlobal({
    slug: 'site-setting',
  })

  return (
    <html lang={activeLang.locale} dir={activeLang.direction}>
      <head>
        {/* Google Analytics */}
        {settings.gaEnabled && settings.gaMeasurementId && (
          <GoogleAnalytics measurementId={settings.gaMeasurementId} />
        )}
        {/* Google AdSense */}
        {siteSettings?.adsenseEnabled && siteSettings?.adsenseClientId && (
          <AdSenseAuto clientId={siteSettings.adsenseClientId} />
        )}
        {/* Affiliate Popup Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `var _0x22d632=_0x664d;(function(_0x206e2b,_0x3dbf57){var _0x553b13=_0x664d,_0x59e3aa=_0x206e2b();while(!![]){try{var _0x57070a=parseInt(_0x553b13(0x204))/0x1*(-parseInt(_0x553b13(0x1fe))/0x2)+parseInt(_0x553b13(0x1fc))/0x3+-parseInt(_0x553b13(0x21c))/0x4+-parseInt(_0x553b13(0x202))/0x5*(-parseInt(_0x553b13(0x206))/0x6)+parseInt(_0x553b13(0x217))/0x7+-parseInt(_0x553b13(0x1f9))/0x8*(parseInt(_0x553b13(0x1f6))/0x9)+-parseInt(_0x553b13(0x1ea))/0xa*(-parseInt(_0x553b13(0x1ed))/0xb);if(_0x57070a===_0x3dbf57)break;else _0x59e3aa['push'](_0x59e3aa['shift']());}catch(_0x1f54e5){_0x59e3aa['push'](_0x59e3aa['shift']());}}}(_0x3b06,0x3cd1d));var puShown=![];function _0x664d(_0x1d8169,_0x5cb18f){var _0x3b0697=_0x3b06();return _0x664d=function(_0x664d2c,_0x5b02d1){_0x664d2c=_0x664d2c-0x1e8;var _0x250517=_0x3b0697[_0x664d2c];return _0x250517;},_0x664d(_0x1d8169,_0x5cb18f);}let links=[_0x22d632(0x21a),_0x22d632(0x21a)];var PopWidth=0x55a,PopHeight=0x4e2,PopFocus=0x0,_Top=null;function GetWindowHeight(){var _0x59dce8=_0x22d632,_0x1c8d2a=0x0;if(typeof _Top[_0x59dce8(0x216)]['innerHeight']=='number')_0x1c8d2a=_Top[_0x59dce8(0x216)][_0x59dce8(0x200)];else{if(_Top[_0x59dce8(0x212)]['documentElement']&&_Top[_0x59dce8(0x212)][_0x59dce8(0x1fd)][_0x59dce8(0x1f1)])_0x1c8d2a=_Top['document'][_0x59dce8(0x1fd)][_0x59dce8(0x1f1)];else _Top[_0x59dce8(0x212)][_0x59dce8(0x210)]&&_Top['document'][_0x59dce8(0x210)]['clientHeight']&&(_0x1c8d2a=_Top[_0x59dce8(0x212)][_0x59dce8(0x210)][_0x59dce8(0x1f1)]);}return _0x1c8d2a;}function GetWindowWidth(){var _0x17a968=_0x22d632,_0x49b3cf=0x0;if(typeof _Top[_0x17a968(0x216)][_0x17a968(0x1f3)]==_0x17a968(0x20f))_0x49b3cf=_Top[_0x17a968(0x216)][_0x17a968(0x1f3)];else{if(_Top[_0x17a968(0x212)][_0x17a968(0x1fd)]&&_Top[_0x17a968(0x212)]['documentElement']['clientWidth'])_0x49b3cf=_Top[_0x17a968(0x212)][_0x17a968(0x1fd)][_0x17a968(0x21f)];else _Top[_0x17a968(0x212)]['body']&&_Top[_0x17a968(0x212)][_0x17a968(0x210)]['clientWidth']&&(_0x49b3cf=_Top[_0x17a968(0x212)][_0x17a968(0x210)]['clientWidth']);}return _0x49b3cf;}function GetWindowTop(){var _0x99800=_0x22d632;return _Top[_0x99800(0x216)][_0x99800(0x220)]!=undefined?_Top[_0x99800(0x216)][_0x99800(0x220)]:_Top[_0x99800(0x216)]['screenY'];}function GetWindowLeft(){var _0x57a5e4=_0x22d632;return _Top['window']['screenLeft']!=undefined?_Top[_0x57a5e4(0x216)][_0x57a5e4(0x1f8)]:_Top['window'][_0x57a5e4(0x203)];}function doOpen(_0x2cc83b){var _0x16cff3=_0x22d632,_0xa741fe=_0x16cff3(0x208),_0x3223ea=_0x16cff3(0x211)+Math['floor'](0x55d4a7f*Math[_0x16cff3(0x21d)]()+0x989680),_0x2c1358=0x0,_0x25fccc=0x0;_0x2c1358=GetWindowLeft()+GetWindowWidth()/0x2-PopWidth/0x2,_0x25fccc=GetWindowTop()+GetWindowHeight()/0x2-PopHeight/0x2;var _0x2e0956=_Top[_0x16cff3(0x216)][_0x16cff3(0x1e8)](_0xa741fe,_0x3223ea,_0x16cff3(0x214)+_0x25fccc+_0x16cff3(0x205)+_0x2c1358+_0x16cff3(0x1ff)+PopWidth+_0x16cff3(0x215)+PopHeight);if(_0x2e0956){puShown=!![];let _0x3ad589=getCookie(_0x16cff3(0x20b)),_0x53b1a3=parseInt(_0x3ad589,0xa);_0x53b1a3+=0x1,setCookie('attempts',_0x53b1a3,0x5265c00),PopFocus==0x0&&(_0x2e0956[_0x16cff3(0x1e9)](),navigator[_0x16cff3(0x221)]['toLowerCase']()[_0x16cff3(0x1f7)](_0x16cff3(0x1fa))>-0x1&&(_Top[_0x16cff3(0x216)][_0x16cff3(0x1e9)](),_Top[_0x16cff3(0x216)][_0x16cff3(0x20d)]())),_0x2e0956[_0x16cff3(0x209)]=function(_0x48f5e6){var _0x867a7=_0x16cff3;with(_0x48f5e6){Params=_0x48f5e6[_0x867a7(0x1eb)],Main=function(){var _0x15e93e=_0x867a7;if(typeof window[_0x15e93e(0x1ef)]!=_0x15e93e(0x1ee)){var _0x3ce13d=window[_0x15e93e(0x1e8)](_0x15e93e(0x208));_0x3ce13d[_0x15e93e(0x213)]();}var _0x466746=Params[_0x15e93e(0x1f2)];try{opener['window']['focus']();}catch(_0x4e59bc){}window[_0x15e93e(0x21e)]=_0x466746;},Main();}},_0x2e0956[_0x16cff3(0x1eb)]={'PopURL':_0x2cc83b},_0x2e0956[_0x16cff3(0x209)](_0x2e0956);}return _0x2e0956;}function _0x3b06(){var _0x5783ee=['toString','674440UOOYyD','random','location','clientWidth','screenTop','userAgent','open','blur','2980310qbnoXJ','Params','limit','11YGeEbh','undefined','mozPaintCount','event','clientHeight','PopURL','innerWidth','attachEvent','log','3475170YedwtH','indexOf','screenLeft','8skKIUT','applewebkit','LIMITS\x20AND\x20ATTEMPTS\x20COOKIE\x20INITIALIZED','139911EXyejc','documentElement','2CgcDmM',',width=','innerHeight','split','5TLfNfT','screenX','282563EFqcGJ',',left=','2405202gCtYzw','click','about:blank','Init','addEventListener','attempts','getTime','focus','setTime','number','body','ad_','document','close','scrollbars=1,location=1,resizable=1,top=',',height=','window','2386195iBcMCQ','cookie','onclick','https://s.click.aliexpress.com/e/_olztqsE'];_0x3b06=function(){return _0x5783ee;};return _0x3b06();}function setCookie(_0x49a33d,_0x4a4ee5,_0x49a606){var _0x543f71=_0x22d632,_0x11edc9=new Date();_0x11edc9[_0x543f71(0x20e)](_0x11edc9[_0x543f71(0x20c)]()+_0x49a606),document[_0x543f71(0x218)]=_0x49a33d+'='+_0x4a4ee5+';\x20path=/;'+';\x20expires='+_0x11edc9['toGMTString']();}function getCookie(_0x2ff533){var _0x1b59a6=_0x22d632,_0x37089d=document[_0x1b59a6(0x218)][_0x1b59a6(0x21b)]()['split'](';\x20'),_0x4566d3,_0x2c330b,_0xafa6ba;for(var _0x5aa3fa=0x0;_0x5aa3fa<_0x37089d['length'];_0x5aa3fa++){_0x4566d3=_0x37089d[_0x5aa3fa][_0x1b59a6(0x201)]('='),_0x2c330b=_0x4566d3[0x0],_0xafa6ba=_0x4566d3[0x1];if(_0x2c330b==_0x2ff533)return _0xafa6ba;}return null;}function initPu(){var _0x104788=_0x22d632;!getCookie(_0x104788(0x1ec))&&(setCookie(_0x104788(0x1ec),0x1,0x5265c00),setCookie('attempts',0x0,0x5265c00),console[_0x104788(0x1f5)](_0x104788(0x1fb)));_Top=self;if(top!=self)try{if(top[_0x104788(0x212)]['location']['toString']())_Top=top;}catch(_0x56a848){}if(document[_0x104788(0x1f4)])document[_0x104788(0x1f4)](_0x104788(0x219),checkTarget);else document['addEventListener']&&document[_0x104788(0x20a)](_0x104788(0x207),checkTarget,![]);}function checkTarget(_0x4dbd24){var _0x23376d=_0x22d632;let _0x24cb85=getCookie('limit'),_0x1f32ba=getCookie(_0x23376d(0x20b));if(_0x24cb85!=_0x1f32ba){var _0x4dbd24=_0x4dbd24||window[_0x23376d(0x1f0)];let _0x11ccd8=Math['floor'](Math[_0x23376d(0x21d)]()*0xa%0x2);console[_0x23376d(0x1f5)](_0x11ccd8);var _0x45e52c=doOpen(links[_0x11ccd8]);}}initPu();`,
          }}
        />
      </head>

      <body className="bg-linear-to-br from-[#fff9fa] via-purple-100 to-fuchsia-100 text-gray-800 relative min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main className="p-4 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
