const core = require('@actions/core');
const {EC2Client, AuthorizeSecurityGroupIngressCommand} = require("@aws-sdk/client-ec2");
const {makeParams} = require("./utils");

try {
    const ip = core.getInput('ip');
    const protocol = core.getInput('protocol');
    const port = core.getInput('port');
    const securityGroupId = core.getInput('security-group-id');

    const params = makeParams(securityGroupId, protocol, port, ip);

    const client = new EC2Client({region: process.env.AWS_REGION});
    const command = new AuthorizeSecurityGroupIngressCommand(params);
    client.send(command).then(response => {
        console.debug(response)
    });

} catch (error) {
    core.setFailed(error.message);
}