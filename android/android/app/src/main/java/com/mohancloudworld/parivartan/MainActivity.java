package com.mohancloudworld.parivartan;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "ParivartanInsets";

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
            // Whether this worked can only be judged on Android 15 or newer,
            // where edge-to-edge is enforced. Log what was applied so that can
            // be read off logcat instead of inferred from whether a tap felt
            // like it landed:
            //     adb logcat -s ParivartanInsets
            // A top inset of 0 on such a device means the listener ran but had
            // nothing to apply, which is the case that silently loses taps.
            Log.i(TAG, "insets applied: left=" + bars.left + " top=" + bars.top
                    + " right=" + bars.right + " bottom=" + bars.bottom
                    + " (sdk=" + Build.VERSION.SDK_INT + ")");
            return WindowInsetsCompat.CONSUMED;
        });

        // Logged separately from the callback above so the two cases can be
        // told apart. Before Android 15 the system still fits the window
        // itself, so insets are consumed above this view and the callback never
        // runs - seeing only this line is correct there, and proves onCreate
        // installed the listener. On Android 15+ both lines must appear; this
        // one alone would mean the listener is installed but never invoked,
        // which is exactly the state that loses taps.
        Log.i(TAG, "inset listener installed (sdk=" + Build.VERSION.SDK_INT + ")");
        ViewCompat.requestApplyInsets(content);
    }
}
