// git-gui Windows shortcut support
// Copyright (C) 2007 Shawn Pearce

const WshShell = WScript.CreateObject("WScript.Shell");
const argv = WScript.Arguments;
let argi = 0;
const lnk_path = argv.item(argi++);
const ico_path = argi < argv.length ? argv.item(argi++) : undefined;
const dir_path = argi < argv.length ? argv.item(argi++) : undefined;
const lnk_exec = argi < argv.length ? argv.item(argi++) : undefined;
let lnk_args = "";
while (argi < argv.length) {
  const s = argv.item(argi++);
  if (lnk_args != "") {
    lnk_args += " ";
  }
  if (s.indexOf(" ") >= 0) {
    lnk_args += '"';
    lnk_args += s;
    lnk_args += '"';
  } else {
    lnk_args += s;
  }
}

const lnk = WshShell.CreateShortcut(lnk_path);
if (argv.length == 1) {
  WScript.echo(lnk.TargetPath);
} else {
  lnk.TargetPath = lnk_exec;
  lnk.Arguments = lnk_args;
  lnk.IconLocation = ico_path + ", 0";
  lnk.WorkingDirectory = dir_path;
  lnk.Save();
}
