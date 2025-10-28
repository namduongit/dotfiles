**CMD**: lspci | grep -E "(VGA|3D|Display)"
- To show information about card (CPU & GPU) in computer

**CMD**: glxinfo | grep "OpenGL renderer"
- To check what GPU is used to render env X11
- glxinfo is tool in mesa-utils package

**CMD**: xrandr --listproviders
- List "graphics providers" (list of GPU) which Server X can see and use

**CMD**: prime-run [app]
- To run another app with GPU (NVIDIA)

**CMD**: ls /sys/class/drm/
- GUI system (sysfs) to kernel can list all graphic cards, port and render device

**CMD**: envycontrol --query
- ... Check mode


---
**Code Bash Shell**
```bash
for card in /sys/class/drm/card*; 
    do echo "=== $(basename $card) ==="; cat $card/device/uevent 2>/dev/null | grep DRIVER || echo "No driver info"; 
    
done

# Result
=== card0 ===
DRIVER=nvidia
=== card0-HDMI-A-1 ===
No driver info
=== card1 ===
DRIVER=i915
=== card1-DP-1 ===
No driver info
=== card1-DP-2 ===
No driver info
=== card1-eDP-1 ===
No driver info

-> System is using nvidia
```

