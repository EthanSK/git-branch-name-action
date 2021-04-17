"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs_1 = require("fs");
async function run() {
    try {
        if (!process.env.GITHUB_EVENT_PATH) {
            throw new Error("GITHUB_EVENT_PATH env var not set");
        }
        const event = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
        const isPullRequest = !!event.pull_request;
        let branchName;
        if (isPullRequest) {
            branchName = event.pull_request.head.ref;
        }
        else {
            if (!process.env.GITHUB_REF) {
                throw new Error("GITHUB_EVENT_PATH env var not set");
            }
            branchName = process.env.GITHUB_REF.split("/").slice(2).join("/").replace;
        }
        core.exportVariable("GIT_BRANCH_NAME", branchName);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
