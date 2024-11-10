# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_all

datas = [('ctf_dashboard_app.py', '.'), ('app.py', '.'), ('database.db', '.'), ('generate_aes_text.py', '.'), ('print.sh', '.'), ('static', 'static'), ('templates', 'templates'), ('ctf_dashboard_backend', 'ctf_dashboard_backend'), ('ctf_dashboard_frontend', 'ctf_dashboard_frontend'), ('data', 'data'), ('sql', 'sql'), ('./env/Lib/site-packages/Flask_Bcrypt-1.0.1.dist-info/*', 'flask_bcrypt'), ('./env/Lib/site-packages/bcrypt/*', 'bcrypt')]
binaries = []
hiddenimports = ['flask-bcrypt', 'flask', 'werkzeug']
tmp_ret = collect_all('flask-bcrypt')
datas += tmp_ret[0]; binaries += tmp_ret[1]; hiddenimports += tmp_ret[2]


a = Analysis(
    ['making_exe.py'],
    pathex=[],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='making_exe',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
