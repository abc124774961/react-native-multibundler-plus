package com.mobilepos.BundleUtils;

public interface UpdateProgressListener {
    public void updateProgressChange(int precent);
    public void complete(boolean success);
}
