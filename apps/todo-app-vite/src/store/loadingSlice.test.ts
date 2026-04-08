import {loadingSliceDef} from "./loadingSlice";
import type {PayloadAction} from "@reduxjs/toolkit";

function testLoadingSlice() {
    const fakeState = {
        completed: true,
        successful: false
    };

    const mockAction: PayloadAction = {
        type: 'loading/loadingCompleted',
        payload: undefined
    };

    loadingSliceDef.reducers.loadingStarted(fakeState, mockAction);

    if(fakeState.completed) {
        throw new Error('LoadingSlice Test Case: loadingStarted reducer failed.');
    } else {
        console.log('LoadingSlice Test Case: loadingStarted reducer worked.');
    }
}

testLoadingSlice();