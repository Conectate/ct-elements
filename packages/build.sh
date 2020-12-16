CWD="$(pwd)"
for D in `ls`
do
    echo "---------------- RUN ON $CWD/$D --------------------"
    cd "$CWD/$D"
    yarn prepare
done
cd "$CWD"