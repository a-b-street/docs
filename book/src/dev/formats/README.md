# Data formats

This section describes data formats that A/B Street uses for input and output.
Like the API, nothing is guaranteed to be backwards-compatible yet. The best way
to make sure schema changes won't mess up your workflow is to keep in touch and
make sure I know how you're using these files.

The formats are currently JSON, without a machine-readable schema. In the
future, I'm highly likely to use protocol buffers, flatbuffers, Thrift, etc
instead, so that languages with static type systems can benefit from
auto-generated libraries and so that larger files can be encoded in binary.
