package com.mohancloudworld.parivartan;

import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    // From targetSdk 35 Android enforces edge-to-edge with no real opt-out, so
    // the WebView draws underneath the status bar and the system takes any tap
    // that lands there. In this app that is the whole top bar: the back button,
    // A-/A+ and the settings and reorder controls all sit in that strip.
    //
    // The fix has to pad the CONTAINER. Two things that look correct do nothing:
    // setDecorFitsSystemWindows(window, true) is a documented no-op once
    // edge-to-edge is enforced, and padding the WebView itself is ignored
    // because WebView does not honour its own padding.
    //
    // displayCutout() is taken alongside systemBars() so a notch or punch-hole
    // does not swallow taps in landscape.
    //
    // Returning CONSUMED means the WebView already sits inside the safe area, so
    // env(safe-area-inset-*) correctly reports 0 here. The CSS that uses those
    // insets in www/css/app.css stays for iOS standalone, where it is the whole
    // fix, and costs nothing on Android.
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View content = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(content, (v, insets) -> {
            Insets bars = insets.getInsets(
                    WindowInsetsCompat.Type.systemBars()
                            | WindowInsetsCompat.Type.displayCutout());
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });
    }
}
